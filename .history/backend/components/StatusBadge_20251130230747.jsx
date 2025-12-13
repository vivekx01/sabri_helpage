import React from 'react';
import { Badge } from '@adminjs/design-system';

const STATUS_COLORS = {
  pending: 'warning',
  'under-review': 'info',
  approved: 'success',
  rejected: 'danger',
  archived: 'default',
  draft: 'info',
  published: 'success',
  active: 'success',
  inactive: 'default',
  new: 'primary',
  read: 'info',
  replied: 'success',
};

const STATUS_ICONS = {
  pending: '⏳',
  'under-review': '👁️',
  approved: '✅',
  rejected: '❌',
  archived: '📦',
  draft: '📝',
  published: '✅',
  active: '✅',
  inactive: '⏸️',
  new: '🆕',
  read: '👁️',
  replied: '✅',
};

const StatusBadge = (props) => {
  const { record, property } = props;
  const value = record.params[property.path];
  
  if (!value) return null;

  const color = STATUS_COLORS[value] || 'default';
  const icon = STATUS_ICONS[value] || '';

  return (
    <Badge variant={color}>
      {icon} {value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}
    </Badge>
  );
};

export default StatusBadge;
