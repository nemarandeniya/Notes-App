const Note = require('../models/Notes');
const mongoose = require('mongoose')


exports.dashboard = async (req, res) => {


    // async function insertDummYCategoryData() {
    //     try {
    //         await Note.insertMany([
    //             {
    //                 user: "63a311c746a82a5d58143e1a",
    //                 title: "NodeJs Notes",
    //                 body: "Node.js is an open source server envorionment.",
    //                 createdAt: "1671634422539"
    //             },
    //             {
    //                 user: "63a311c746a82a5d58143e1a",
    //                 title: "NodeJs Notes",
    //                 body: "Node.js is an open source server envorionment.",
    //                 createdAt: "1671634422539"
    //             },
    //             {
    //                 user: "63a311c746a82a5d58143e1a",
    //                 title: "NodeJs Notes",
    //                 body: "Node.js is an open source server envorionment.",
    //                 createdAt: "1671634422539"
    //             },
    //         ])
    //     } catch (error) {

    //     }
    // }

    // insertDummYCategoryData();

    const locals = {
        title: 'Dashboard',
        description: 'Write Your thoughts'
    }

    try {
        const notes = await Note.find({})
        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: '../views/layouts/dashboard'
        });
        console.log(notes);

    } catch (error) {

    }
}