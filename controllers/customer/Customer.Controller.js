import { createRequire } from "module";
const require = createRequire(import.meta.url);


const Customer = require("../../models/Customer.model");
const Booking = require("../../models/Booking.model");
const CustomerMobile = require("../../models/CustomerMobile.model");
const Contact = require("../../models/Contact.model");
const Rating = require("../../models/Rating.model");
const CustomerPool = require("../../models/CustomerPool.model");
const HallReservation = require("../../models/HallReservation.model");

const { getMessage } = require("../language/messages");

const getLanguage = (req) => (req.headers["accept-language"] === "ar" ? "ar" : "en");

export const getCustomerById = async (req, res) => {
    const lang = getLanguage(req);
    const { id } = req.params;
    const customer = await Customer.findOne({
        where: { id },
        include: [
            { model: Booking },
            { model: CustomerMobile },
            { model: Contact },
            { model: Rating },
            { model: CustomerPool },
            { model: HallReservation },
        ]

    });
    if (!customer) {
        return res.status(404).json({ message: getMessage("customerNotFound", lang) });
    }
    res.status(200).json(customer);
}

export const getAllCustomers = async (req, res) => {
    const lang = getLanguage(req);
    const customers = await Customer.findAll({
        include: [
            { model: CustomerMobile },
        ]
    });
    if (!customers) {
        return res.status(404).json({ message: getMessage("customersNotFound", lang) });
    }
    res.status(200).json(customers);
}

export const roomRating = async (req, res) => {
    const lang = getLanguage(req);
    const customer_id = req.params.id;
    const { room_id, rating, comment } = req.body;

    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
        return res.status(404).json({ message: getMessage("customerNotFound", lang) });
    }

    let existingRating = await Rating.findOne({ where: { customer_id, room_id } });

    if (existingRating) {
        await Rating.update(
            { rating, comment },
            { where: { customer_id, room_id } }
        );
        return res.status(200).json({ message: getMessage("ratingUpdated", lang) });
    }

    await Rating.create({ customer_id, room_id, rating, comment });
    return res.status(201).json({ message: getMessage("ratingDone", lang) });
}

export const poolRating = async (req, res) => {
    const lang = getLanguage(req);
    const customer_id = req.params.id;
    const { pool_id, rating, comment } = req.body;

    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
        return res.status(404).json({ message: getMessage("customerNotFound", lang) });
    }

    let existingRating = await Rating.findOne({ where: { customer_id, pool_id } });

    if (existingRating) {
        await Rating.update(
            { rating, comment },
            { where: { customer_id, pool_id } }
        );
        return res.status(200).json({ message: getMessage("ratingUpdated", lang) });
    }

    await Rating.create({ customer_id, pool_id, rating, comment });
    return res.status(201).json({ message: getMessage("ratingDone", lang) });
}

export const hallRating = async (req, res) => {
    const lang = getLanguage(req);
    const customer_id = req.params.id;
    const { hall_id, rating, comment } = req.body;

    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
        return res.status(404).json({ message: getMessage("customerNotFound", lang) });
    }

    let existingRating = await Rating.findOne({ where: { customer_id, hall_id } });

    if (existingRating) {
        await Rating.update(
            { rating, comment },
            { where: { customer_id, hall_id } }
        );
        return res.status(200).json({ message: getMessage("ratingUpdated", lang) });
    }

    await Rating.create({ customer_id, hall_id, rating, comment });
    return res.status(201).json({ message: getMessage("ratingDone", lang) });
}

export const deleteCustomer = async (req, res) => {
    const lang = getLanguage(req);
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
        return res.status(404).json({ message: getMessage("customerNotFound", lang) });
    }

    await Customer.destroy({ where: { id } });
    res.status(204).json({ message: getMessage("customerDeleted", lang) });
}