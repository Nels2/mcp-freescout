export type TicketTagUpdateMode = 'add' | 'remove' | 'replace';

const uniqueTagNames = (tags: string[]): string[] => [...new Set(tags)];

export function resolveTicketTagNames(
  currentTags: string[],
  requestedTags: string[],
  mode: TicketTagUpdateMode
): string[] {
  const uniqueRequestedTags = uniqueTagNames(requestedTags);

  if (mode === 'replace') {
    return uniqueRequestedTags;
  }

  const uniqueCurrentTags = uniqueTagNames(currentTags);

  if (mode === 'add') {
    return [
      ...uniqueCurrentTags,
      ...uniqueRequestedTags.filter((tag) => !uniqueCurrentTags.includes(tag)),
    ];
  }

  return uniqueCurrentTags.filter((tag) => !uniqueRequestedTags.includes(tag));
}
