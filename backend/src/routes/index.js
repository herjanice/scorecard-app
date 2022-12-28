import { Router } from 'express';

const router = Router();

router.delete("/cards", async (req, res) => {
    try {
        await ScoreCard.deleteMany({});
        console.log("Database cleared");
        res.json({ message: 'Database cleared.' });  
    } catch (event) {
        throw new Error("Database deletion failed");
    }
});

router.post("/card", async (req, res) => {
    try {
        req.body.name = req.body.name[0].toUpperCase() + req.body.name.substring(1);
        req.body.subject = req.body.subject[0].toUpperCase() + req.body.subject.substring(1);
        let pairExist = await ScoreCard.findOne({ name: req.body.name, subject: req.body.subject}); 
        if( pairExist ){
            let updatedEntry = await ScoreCard.findOneAndUpdate({name: `${req.body.name}`, subject: `${req.body.subject}`}, {score: `${req.body.score}`}, {
                returnOriginal: false
            });
            res.json({ message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: `(${req.body.name}, ${req.body.subject}, ${req.body.score})` });   
        }
        else{
            await ScoreCard.create({name: `${req.body.name}`, subject: `${req.body.subject}`, score: `${req.body.score}`});
            res.json({ message: `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: `(${req.body.name}, ${req.body.subject}, ${req.body.score})` });   
        }
    } catch (event) {
        res.json({ message: "Database insertion failed" });   
        throw new Error("Database insertion failed");
    }
});

router.get("/cards", async (req, res) => {
    try {
        req.query.queryString = req.query.queryString[0].toUpperCase() + req.query.queryString.substring(1);
        var condition = { [req.query.type]: req.query.queryString };
        let results = await ScoreCard.find(condition);
        let count = await ScoreCard.count(condition);
        let text = [];
        if(count > 0){
            results.forEach(function(result){
                let msg = `Found card with ${req.query.type}: (${result.name}, ${result.subject}, ${result.score})\n`;
                text.push(msg);
            })
            console.log(text)
            res.json({ messages: text });
        }
        else{
            if(req.query.type === "name"){
                text.push(`Name (${req.query.queryString}) not found!`);
            }
            else if(req.query.type === "subject"){
                text.push(`Subject (${req.query.queryString}) not found!`);
            }
            res.json({ message: text });
        }
    } catch (event) {
        res.json({ message: "Database search failed"});  
        throw new Error("Database search failed"); 
    }
});

export default router;