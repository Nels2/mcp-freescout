import { resolveTicketTagNames } from '../ticket-tags.js';

describe('resolveTicketTagNames', () => {
  it('adds a new tag while preserving current tags', () => {
    expect(resolveTicketTagNames(['vip', 'escalated'], ['network'], 'add')).toEqual([
      'vip',
      'escalated',
      'network',
    ]);
  });

  it('does not duplicate existing or requested tags', () => {
    expect(resolveTicketTagNames(['vip', 'vip'], ['vip', 'network', 'network'], 'add')).toEqual([
      'vip',
      'network',
    ]);
  });

  it('removes requested tags while preserving unrelated tags', () => {
    expect(resolveTicketTagNames(['vip', 'escalated', 'network'], ['vip'], 'remove')).toEqual([
      'escalated',
      'network',
    ]);
  });

  it('replaces the complete tag list', () => {
    expect(resolveTicketTagNames(['vip', 'escalated'], ['overdue', 'refund'], 'replace')).toEqual([
      'overdue',
      'refund',
    ]);
  });

  it('allows replace with an empty array to clear all tags', () => {
    expect(resolveTicketTagNames(['vip'], [], 'replace')).toEqual([]);
  });
});
