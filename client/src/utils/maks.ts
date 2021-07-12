export const masks = {
  date: (value: string) => {
    const newValue = value
      .replace(/\D/g, '')
      .replace(/(^[0-9]{2})/, '$1/')
      .replace(/(^[0-9]{2})\/([0-9]{2})/, '$1/$2/')
      .replace(/(^[0-9]{2})\/([0-9]{2})\/([0-9]{4})$/, '$1/$2/$3')
      .replace(/(^[0-9]{2}\/[0-9]{2}\/[0-9]{4})\d+?$/, '$1');

    return newValue;
  }
};
