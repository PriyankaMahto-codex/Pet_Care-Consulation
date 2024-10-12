const port =4000;
const express = require("express");
const app= express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer  = require("multer");
const path = require("path")
const cors =require("cors");
const { type } = require("os");




app.use(express.json())
app.use(cors())

const DB= `mongodb+srv://PetDoc:PetDoc100@cluster0.3ixtt9u.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('connection successful');
}).catch((err)=>console.log("no connection"));

const midleware = (req,res,next)=>{
    console.log("middleware is here");
    next();
}
app.get('/',(req,res)=>{
    res.send("hello world from the server");
});

app.get('/about',midleware,(req,res)=>{
    console.log("this is about");
    res.send("this is about");
});
app.get('/signin',(req,res)=>{
    res.send("this is signin");
});
app.get('/signup',(req,res)=>{
    res.send("this is signup");
});
app.get('/contact',(req,res)=>{
    res.cookie("Test",'example');
    res.send("this is contact");
});

//image storage 

const storage = multer.diskStorage({
    destination: './Upload/Images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});
app.use('/Images',express.static('Upload/Images'))


app.post("/Upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/Images/${req.file.filename}`
    })
})
app.post("/Uploaddoc",upload.single('doc'),(req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/Images/${req.file.filename}`
    })
})

// schema for creating Products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    new_price:{
        type: String,
        required:true,
    },
    old_price:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type:Boolean,
        default: true,
    },
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else
    {
        id=1;
    }
    const product = new Product({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        description:req.body.description,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    });
})

//Creating API for delete the products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("deleted");
    res.json({
        success:true,
        name: req.body.name
    })
})

app.get('/allproduct',async (req,res)=>{
    let products = await Product.find({});
    console.log("All product fetch");
    res.send(products);
})


const fetchPatient = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"please authanticate a valid token"});
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.patient = data.patient;
            next();
        }catch{
            res.status(401).send({errors:"please authanticate a valid token"});
        }
    }
}
debugger;
app.post('/addtocart',fetchPatient,async (req,res)=>{
    console.log("Added",req.body.itemId);
    console.log(req.body,req.patient);
    let patientData = await Patient.findOne({_id:req.patient.id});
    patientData.cartData[req.body.itemId]+=1;
    await Patient.findOneAndUpdate({_id:req.patient.id},{cartData:patientData.cartData});
    res.send("added");
})  

app.post('/removefromcart',fetchPatient,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let patientData = await Patient.findOne({_id:req.patient.id});
    if(patientData.cartData[req.body.itemId]>0)
    patientData.cartData[req.body.itemId] -=1;
    await Patient.findOneAndUpdate({_id:req.patient.id},{cartData:patientData.cartData});
    res.send("removed");
})


app.post('/getcart',fetchPatient,async(req,res)=>{
    console.log("getcart");
    let patientData = await Patient.findOne({_id:req.patient.id});
    res.json(patientData.cartData);
})

app.get('/newcollection',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newcollection);
})


 app.get('/popularwomen', async(req,res)=>{
    let products = await Product.find({category:"Cat"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
 })
//userSchema

const Patient = mongoose.model('Patient',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

  
app.post('/signup',async(req,res)=>{
    let check =await Patient.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"this email id already exsist"});
    }
    let cart = {};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const patient = new Patient({
        name:req.body.patientname,
        email: req.body.email,
        password: req.body.password,
        cartData:cart,
    })

    await patient.save();

    const data = {
        patient:{
            id:patient.id
        }
    }
    const token =jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})



app.post('/login',async(req,res)=>{
    let patient = await Patient.findOne({email:req.body.email});
    if(patient){
        const passCompare = req.body.password === patient.password;
        if(passCompare){
            const data = {
                patient:{
                    id:patient.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token}); 
        }
        else{
            res.json({success:false,error:"Wrong password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email id"})
    }
})

const Doctor = mongoose.model('Doctor',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

app.post('/Doctorsignup',async(req,res)=>{
    let check =await Doctor.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"this email id already exsist"});
    }
    const doctor = new Doctor({
        name:req.body.doctorname,
        email: req.body.email,
        password: req.body.password,
    })

    await doctor.save();

    const data = {
        doctor:{
            id:doctor.id
        }
    }
    const token =jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

app.post('/Doctorlogin',async(req,res)=>{
    let doctor = await Doctor.findOne({email:req.body.email});
    if(doctor){
        const passCompare = req.body.password === doctor.password;
        if(passCompare){
            const data = {
                doctor:{
                    id:doctor.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token}); 
        }
        else{
            res.json({success:false,error:"Wrong password"});
        }
    }
    else{
        res.json({success:false,error:"Wrong Email id"})
    }
})

const DocInfo = mongoose.model('DoctorInfo',{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    Clinic:{
        type: String,
        required:true,
    }
})

app.post('/AddDetailsDoc',async (req,res)=>{
    let products = await DocInfo.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else
    {
        id=1;
    }
    const product = new DocInfo({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category:req.body.category,
        Clinic:req.body.Clinic,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    });
})

app.post('/removeDoctorDetails',async (req,res)=>{
    await DocInfo.findOneAndDelete({id: req.body.id});
    console.log("deleted");
    res.json({
        success:true,
        name: req.body.name
    })
})

app.get('/allDoctorDetails',async (req,res)=>{
    let products = await DocInfo.find({});
    console.log("All product fetch");
    res.send(products);
})


app.get('/allDoctorDetails/:id', async (req, res) => {
    try {
      const doctor = await DocInfo.findOne({ _id: req.params.id });
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      console.log('Doctor details fetched');
      res.send(doctor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
});


// const PORT=2000;
app.listen(port,()=>{
    console.log("server side is running");
}); 
