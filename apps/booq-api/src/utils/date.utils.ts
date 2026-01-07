export const applyBuffer = (
  startAt: Date,
  endAt: Date | null,
  bufferBefore = 0,
  bufferAfter = 0,
) => {
  return {
    startAt: new Date(startAt.getTime() - bufferBefore * 60_000),
    endAt: endAt ? new Date(endAt.getTime() + bufferAfter * 60_000) : null,
  };
};
