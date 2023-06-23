const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes, Op } = require('sequelize');

module.exports = (seq,m,authMiddleware) => {
    router.post("/", async function(){
        let q = req.body;
        res.status(200).send({
        });
    });
    router.get("/", async function(){
        let q = req.body;
        res.status(200).send({
        });
    });
    router.put("/", async function(){
        let q = req.body;
        res.status(200).send({
        });
    });
    router.delete("/", async function(){
        let q = req.body;
        res.status(200).send({
        });
    });
}