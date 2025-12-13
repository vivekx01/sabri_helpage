import React, { useEffect, useMemo, useState } from 'react';
import { Box, Label, Input, Textarea, Select, Button, Icon, Text } from '@adminjs/design-system';
import { ApiClient, useNotice, useRecord, useResource } from 'adminjs';

const api = new ApiClient();

// Utilities to normalize sections from record params
const extractSectionsFromParams = (params) => {
  // Prefer array form if present
  if (Array.isArray(params.sections)) {
    return params.sections;
  }
  // Reconstruct from flattened params like sections.0.key
  const indices = new Set();
  Object.keys(params || {}).forEach((k) => {
    const m = k.match(/^sections\.(\d+)\./);
    if (m) indices.add(Number(m[1]));
  });
  const list = Array.from(indices).sort((a,b)=>a-b).map((idx) => ({
    key: params[`sections.${idx}.key`] ?? '',
    order: Number(params[`sections.${idx}.order`] ?? idx),
    type: params[`sections.${idx}.type`] ?? 'paragraph',
    text: params[`sections.${idx}.text`] ?? '',
    level: params[`sections.${idx}.level`] ? Number(params[`sections.${idx}.level`]) : undefined,
    items: params[`sections.${idx}.items`] ?? [],
    imageUrl: params[`sections.${idx}.imageUrl`] ?? '',
    altText: params[`sections.${idx}.altText`] ?? '',
    href: params[`sections.${idx}.href`] ?? '',
    label: params[`sections.${idx}.label`] ?? '',
  }));
  return list;
};

const ensureFour = (sections) => {
  const base = (sections || []).slice().sort((a,b) => (a.order ?? 0) - (b.order ?? 0));
  while (base.length < 4) {
    base.push({ key: '', order: base.length, type: 'paragraph', text: '' });
  }
  return base.slice(0,4);
};

const SectionCard = ({ idx, value, onChange }) => {
  const set = (field, v) => onChange(idx, { ...value, [field]: v });
  const typeOptions = [
    { value: 'heading', label: 'Heading' },
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'list', label: 'List' },
    { value: 'image', label: 'Image' },
    { value: 'cta', label: 'CTA' },
  ];

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

// Property component for PageContent.sections (edit)
const SectionsEditor = (props) => {
  const { record, onChange, property } = props;
  const notice = useNotice();
  const [sections, setSections] = useState(() => ensureFour(extractSectionsFromParams(record.params || {})));

  // Load full record (ensures we have array form) on mount
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        if (!record || !record.id) return;
        const resp = await api.recordAction({ resourceId: record.resourceId, recordId: record.id, actionName: 'show' });
        const params = resp?.data?.record?.params || {};
        if (isMounted) {
          setSections(ensureFour(extractSectionsFromParams(params)));
        }
      } catch (e) {
        // Soft-fail; keep current state
      }
    };
    load();
    return () => { isMounted = false; };
  }, [record?.id]);

  // Propagate changes to AdminJS form params
  const updateAt = (idx, val) => {
    const next = sections.map((s, i) => (i === idx ? val : s));
    // Keep stable order values
    const normalized = next
      .map((s, i) => ({ ...s, order: typeof s.order === 'number' ? s.order : i }))
      .slice(0,4);

    setSections(normalized);

    normalized.forEach((s, i) => {
      onChange(`${property.path}.${i}.key`, s.key ?? '');
      onChange(`${property.path}.${i}.order`, s.order ?? i);
      onChange(`${property.path}.${i}.type`, s.type ?? 'paragraph');
      onChange(`${property.path}.${i}.text`, s.text ?? '');
      if (s.level !== undefined) onChange(`${property.path}.${i}.level`, s.level);
      else onChange(`${property.path}.${i}.level`, undefined);
      onChange(`${property.path}.${i}.items`, s.items ?? []);
      onChange(`${property.path}.${i}.imageUrl`, s.imageUrl ?? '');
      onChange(`${property.path}.${i}.altText`, s.altText ?? '');
      onChange(`${property.path}.${i}.href`, s.href ?? '');
      onChange(`${property.path}.${i}.label`, s.label ?? '');
    });
  };

  const move = (from, to) => {
    if (to < 0 || to >= sections.length) return;
    const arr = sections.slice();
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    // Reindex order
    const re = arr.map((s, i) => ({ ...s, order: i }));
    setSections(re);
    re.forEach((s, i) => onChange(`${property.path}.${i}.order`, i));
  };

  return (
    <Box>
      <Text mb="lg" style={{ fontWeight: 600 }}>Sections (4)</Text>
      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {sections.slice(0,4).map((sec, idx) => (
          <Box key={idx}>
            <Box mb="sm" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: 600 }}>Section {idx + 1}</Text>
              <Box style={{ display: 'flex', gap: 6 }}>
                <Button size="sm" type="button" variant="text" onClick={()=>move(idx, idx-1)} disabled={idx===0}>↑</Button>
                <Button size="sm" type="button" variant="text" onClick={()=>move(idx, idx+1)} disabled={idx===sections.length-1}>↓</Button>
              </Box>
            </Box>
            <SectionCard idx={idx} value={sec} onChange={updateAt} />
          </Box>
        ))}
      </Box>
      <Text mt="md" color="grey60">Use the main Save button to persist all section changes.</Text>
    </Box>
  );
};

export default SectionsEditor;
