import { contactsCollection } from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";


export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = "_id",
    filter = {},
}) => {
    const limit = perPage;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const contactsQuery = contactsCollection.find();

    if (typeof filter.type !== "undefined") {
        contactsQuery.where("contactType").equals(filter.type);
    }
    if (typeof filter.isFavorite !== "undefined") {
        contactsQuery.where("isFavorite").equals(filter.isFavorite);
    }

    const [contactsCount, contacts] = await Promise.all([
        contactsCollection.find()
            .merge(contactsQuery)
            .countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);


    const paginationData = calculatePaginationData(contactsCount, perPage, page);
    return {
        data: contacts,
        ...paginationData,
    };

};

export const getContactsById = (contactId) => contactsCollection.findById(contactId);

export const createContact = (payload) => {
    return contactsCollection.create(payload);
};

export const updateContact = (contactId, payload) => {
    return contactsCollection.findByIdAndUpdate(
        contactId, payload, { new: true }); // чи буде повернуто оновлений документ //
};

export const deleteContact = (contactId) => {
    return contactsCollection.findOneAndDelete({
        _id: contactId,
    });
};