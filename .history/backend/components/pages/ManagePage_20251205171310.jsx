import React, { useEffect, useMemo, useState } from 'react';
import { ApiClient } from 'adminjs';
import { Box, H3, Text, Label, Select, Input, Textarea, Button } from '@adminjs/design-system';

const api = new ApiClient();

const typeOptions = [
  { value: 'heading', label: 'Heading' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'list', label: 'List' },
  { value: 'image', label: 'Image' },
  { value: 'cta', label: 'CTA' },
];

const emptySection = (order) => ({ key: '', order, type: 'paragraph', text: '' });

const SectionEditor = ({ idx, value, onChange }) => {
  const set = (field, v) => onChange(idx, { ...value, [field]: v });
  return (
    <Box variant="card" p="lg" style={{ display: 'grid', gap: 10 }}>
      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Box>
          <Label>Key</Label>
          <Input value={value.key || ''} onChange={(e)=>set('key', e.target.value)} placeholder={`section-${idx+1}`} />
        </Box>
        <Box>
          <Label>Order</Label>
          <Input type="number" value={value.order ?? idx} onChange={(e)=>set('order', Number(e.target.value))} />
        </Box>
      </Box>

      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Box>
          <Label>Type</Label>
          <Select value={value.type || 'paragraph'} onChange={(opt)=>set('type', opt?.value)} options={typeOptions} />
        </Box>
        {value.type === 'heading' && (
          <Box>
            <Label>Heading Level</Label>
            <Input type="number" min={1} max={6} value={value.level || 2} onChange={(e)=>set('level', Number(e.target.value))} />
          </Box>
        )}
      </Box>

      {(value.type === 'paragraph' || value.type === 'heading') && (
        <Box>
          <Label>{value.type === 'heading' ? 'Heading Text' : 'Body Text'}</Label>
          <Textarea rows={4} value={value.text || ''} onChange={(e)=>set('text', e.target.value)} />
        </Box>
      )}

      {value.type === 'list' && (
        <Box>
          <Label>List Items (comma separated)</Label>
          <Input value={(value.items || []).join(', ')} onChange={(e)=>set('items', e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} />
        </Box>
      )}

      {value.type === 'image' && (
        <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Box>
            <Label>Image URL</Label>
            <Input value={value.imageUrl || ''} onChange={(e)=>set('imageUrl', e.target.value)} />
          </Box>
          <Box>
            <Label>Alt Text</Label>
            <Input value={value.altText || ''} onChange={(e)=>set('altText', e.target.value)} />
          </Box>
        </Box>
      )}

      {value.type === 'cta' && (
        <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Box>
            <Label>Label</Label>
            <Input value={value.label || ''} onChange={(e)=>set('label', e.target.value)} />
          </Box>
          <Box>
            <Label>Href</Label>
            <Input value={value.href || ''} onChange={(e)=>set('href', e.target.value)} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

const ManagePage = (props) => {
  const { resource } = props;
  const resourceId = resource.id;
  const [pages, setPages] = useState([]);
  const [slug, setSlug] = useState('home');
  const [meta, setMeta] = useState({ title: '', eyebrow: '', subtitle: '', heroImage: '' });
  const [sections, setSections] = useState([emptySection(0), emptySection(1), emptySection(2), emptySection(3)]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const load = async (targetSlug) => {
    setLoading(true);
    try {
      const resp = await api.resourceAction({ resourceId, actionName: 'manage', query: { slug: targetSlug } });
      const data = resp?.data?.data || {};
      setPages(data.pages || []);
      if (data.page) {
        setMeta({
          title: data.page.title || '',
          eyebrow: data.page.eyebrow || '',
          subtitle: data.page.subtitle || '',
          heroImage: data.page.heroImage || '',
        });
        const ss = (data.page.sections || []).slice().sort((a,b)=> (a.order ?? 0) - (b.order ?? 0));
        while (ss.length < 4) ss.push(emptySection(ss.length));
        setSections(ss.slice(0,4));
      } else {
        setMeta({ title: '', eyebrow: '', subtitle: '', heroImage: '' });
        setSections([emptySection(0), emptySection(1), emptySection(2), emptySection(3)]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(slug); }, []);

  const save = async () => {
    setLoading(true);
    try {
      const payload = {
        slug,
        ...meta,
        sections: sections.map((s, i) => ({
          key: s.key || `section-${i+1}`,
          order: typeof s.order === 'number' ? s.order : i,
          type: s.type || 'paragraph',
          text: s.text || '',
          level: s.level,
          items: Array.isArray(s.items) ? s.items : [],
          imageUrl: s.imageUrl || '',
          altText: s.altText || '',
          href: s.href || '',
          label: s.label || '',
        })),
      };
      const resp = await api.resourceAction({ resourceId, actionName: 'manage', data: payload });
      const n = resp?.data?.notice;
      if (n) setNotice(n);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p="xl">
      <H3 mb="lg">Pages Editor</H3>

      {notice && (
        <Box mb="md" variant={notice.type === 'success' ? 'success' : 'danger'} p="md">
          <Text>{notice.message}</Text>
        </Box>
      )}

      <Box mb="xl" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 16 }}>
        <Box>
          <Label>Page</Label>
          <Select
            value={slug}
            onChange={(opt)=>{ const v = opt?.value; setSlug(v); load(v); }}
            options={(pages || []).map(p => ({ value: p.slug, label: p.name }))}
          />
        </Box>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <Box>
            <Label>Title</Label>
            <Input value={meta.title} onChange={(e)=>setMeta({ ...meta, title: e.target.value })} />
          </Box>
          <Box>
            <Label>Eyebrow</Label>
            <Input value={meta.eyebrow} onChange={(e)=>setMeta({ ...meta, eyebrow: e.target.value })} />
          </Box>
          <Box>
            <Label>Subtitle</Label>
            <Input value={meta.subtitle} onChange={(e)=>setMeta({ ...meta, subtitle: e.target.value })} />
          </Box>
          <Box>
            <Label>Hero Image</Label>
            <Input value={meta.heroImage} onChange={(e)=>setMeta({ ...meta, heroImage: e.target.value })} />
          </Box>
        </Box>
      </Box>

      <Box mb="md">
        <Text fontWeight="bold">Sections</Text>
      </Box>
      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {sections.map((s, idx) => (
          <SectionEditor key={idx} idx={idx} value={s} onChange={(i, val)=>{
            const next = sections.slice();
            next[i] = val; setSections(next);
          }} />
        ))}
      </Box>

      <Box mt="xl" style={{ display: 'flex', gap: 12 }}>
        <Button onClick={save} disabled={loading} variant="primary">Save</Button>
        <Button onClick={()=>load(slug)} disabled={loading} variant="secondary">Reload</Button>
      </Box>
    </Box>
  );
};

export default ManagePage;
