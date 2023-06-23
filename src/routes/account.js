const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes, Op } = require('sequelize');

module.exports = (seq,m,authMiddleware) => {
    router.get("quota/", async function(){
        let q = req.body;
        res.status(200).send({
        });
    });
    router.get("data/", async function(){
        let q = req.body;
        res.status(200).send({
        });
    });
}