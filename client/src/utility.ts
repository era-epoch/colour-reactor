export const AddClassSafe = (e: Element, className: string) => {
  if (!e.classList.contains(className)) {
    e.classList.add(className);
  }
};

export const RemoveClassSafe = (e: Element, className: string) => {
  if (e.classList.contains(className)) {
    e.classList.remove(className);
  }
};
