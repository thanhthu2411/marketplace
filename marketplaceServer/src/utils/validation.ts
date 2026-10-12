type ValicationResult = [isValid: boolean, errorMessage: string | null];

const validateListing = (
  title: string,
  price: number,
  category: string,
  address: string,
): ValicationResult => {
    if (!title || !title.trim()) {
        return [false, "Title is required"]
    }

    if (isNaN(price) || price < 0) {
        return [false, "Price must be a number no less than 0"]
    }

    if (!["books", "furniture", "electronics", "other"].includes(category)) {
        return [false, "Category isn't valid"]
    }

    if (!address || !address.trim()) {
        return [false, "Address is required"]
    }

    return [true, null]
};

export {validateListing}
