const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocodind');
const forecast = require('./utils/forecast');

const app = express();

//define path for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,"../templates/partials");

//set up handler bar and views location
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirPath));



app.get('', (request,response) => {
    response.render('index',{
        title: "Weather",
        name: "mahesh"
    });
})


app.get('/about', (request,response) =>{
    response.render('about',{
        title: "About me",
        name: "mahesh"
    })
})

app.get('/help',(request,response) => {
    response.render('help',{
        title: "Help",
        name: "mahesh",
        message: "You are on write track"
    })
})

app.get('/weather',(request,response) => {
    if(!request.query.address) {
        return response.send({
            error: "Provide address"
        })
    }
    geoCode(request.query.address, (error, { latitude, longitude,place_Name:location}={}) => {
        if(error) {
            return response.send({error})
        } 
        forecast (latitude, longitude ,(error,foreCastdata) => {
            if(error) {
                return response.send({error})
            } 
            response.send({
                forecast: foreCastdata,
                location,
                address: request.query.address
            });
        })
        }
        
    )
   
})

app.get('/product',(request,response)=>{
    if(!request.query.search) {
        return response.send({
            error: "Provide correct search"
        })
    }
    console.log (request.query.search)
    response.send({
        product : []
    })
});
app.get('/help/*',(request, response) => {
    response.render('404',{
        title: "404",
        name: "mahesh",
        errorMessage: "Help Article Not found"
    })
})

app.get('*',(request,response) => {
    response.render('404',{
        title : "404",
        name: "mahesh",
        errorMessage : "404 Page Not Found"
    });
});
    
// app.get('', (request, response) => {
//     response.send('<h1>Hello Express</h1>');             No need for default because index.html render 
// })

// app.get('/help', (request,response) => {
//     response.send([{
//         name: "mahesh"
//     },{
//         name: "ganesh"
//     },{
//         name: "pradnyesh"
//     },{
//         name: "yogesh"
//     }])
// })

// app.get('/about', (request,response) => {
//     response.send('<h1>Express about<h1>')
// })


// app.get('/help/*',(request, response) => {
//     response.send("Help article not found..");
// })

// app.get('*',(request,response) => {
//     response.send("404 Not found");
// });

app.listen(3000,()=> {
    console.log("Express listen on port no 3000");
})