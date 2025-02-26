import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import OpenAI from "openai";

import { supabase } from './supabaseClient.js'; // Import Supabase client
import { getQuiz } from './functions.js';

const tableName = "fragen";

dotenv.config();

const app = express();

// Multer configuration (storing file in memory before uploading to Supabase)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET, POST, PATCH, DELETE, OPTIONS",
    /* allowedHeaders: "Content-Type, Authorization", */
    allowedHeaders: "*",
  })
);

// ✅ Handle Preflight Requests
/* app.options("*", cors()); */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/:lf/questions', async (req, res) => {

  const { lf } = req.params;
  
  try {
    // Querying questions from Supabase database using the supabase client
    const { data, error } = await supabase
      .from(tableName)  
      .select('*')
      .eq('lf', lf);
    
    if (error) {
      throw error;
    }
    console.log(data)
    const questions = getQuiz(data);
    res.json(questions);
  } catch (err) {
    console.error('Error querying the database', err);
    res.status(500).send('Error querying the database');
  }
});

app.get('/:lf/allQuestions', async (req, res) => {
  const { lf } = req.params;
  
  try {
    const { data, error } = await supabase
      .from(tableName)  
      .select('*')
      .eq('lf', lf);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (err) {
    console.error('Error querying the database', err);
    res.status(500).send('Error querying the database');
  }
});

app.delete('/:id/questions', async (req, res) => {
  const { id } = req.params;
 
  try {
    const { data, error } = await supabase
      .from(tableName)  
      .delete()
      .eq('id', Number(id))
      .select();

    if (error) {
      throw error;
    }

    console.log(data);
    console.log(error);

    if (data.length > 0) {
      res.status(200).json({ message: 'Question deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Question not found.' });
    }
  } catch (err) {
    console.error('Error deleting the question', err);
    res.status(500).send('Error deleting the question');
  }
});

app.post("/questions", async (req, res) => {
  const fullQuestion = req.body;
  console.log(fullQuestion);

  try {
    const { lf, type, question, answers, rightAnswers, thema, apOne } = fullQuestion;

    // Insert data into Supabase table
    const { data, error } = await supabase
      .from(tableName)  
      .insert([{
        lf,
        type,
        question,
        answers,
        rightAnswers,
        thema,
        apOne
      }])
      .select(); // Insert one record

    if (error) {
      throw error;
    }

    res.status(201).json({ message: 'Question added successfully', data });
  } catch (err) {
    console.error('Error inserting question', err);
    res.status(500).json({ message: 'Failed to add question', error: err });
  }
});

app.patch("/questions", async (req, res) => {
  const fullQuestion = req.body;
  
  const { id, lf, type, question, answers, rightAnswers, thema, apOne } = fullQuestion;

  try {
    // Update record in Supabase table
    const { data, error } = await supabase
      .from(tableName)  
      .update({
        lf,
        type,
        question,
        answers,
        rightAnswers,
        thema,
        apOne
      })
      .eq('id', Number(id))
      .select();  // Update one record
    
    if (error) {
      throw error;
    }
    
    if (!data) {
      return res.status(404).json({ message: 'No question found with the given ID' });
    }
    
    res.status(200).json({ message: 'Question updated successfully', data });
  } catch (err) {
    console.error('Error updating question', err);
    res.status(500).json({ message: 'Failed to update question', error: err.message });
  }
});

app.patch('/uploadImage', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('questionimages')  // Replace with your actual Supabase bucket name
      .upload(`${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true, // Allows overwriting files with the same name
      });

    if (error) {
      console.error('Supabase upload error:', error.message);
      return res.status(500).json({ message: 'Failed to upload to Supabase', error: error.message });
    }

    
    // Get the public URL of the uploaded file
    const fileURL = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

    // Return success message with file URL
    return res.status(200).json({ message: 'File uploaded successfully', fileURL });
  } catch (err) {
    console.error('Error in upload route:', err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

app.post("/ai", async (req, res) => {
  const content = req.body;
  const contentString = JSON.stringify(content);
  
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { "role": "user", "content": contentString },
      ],
    });

    console.log(completion.choices[0].message);
    res.json(completion.choices[0].message);
  } catch (err) {
    console.error('Error connecting to OpenAI', err);
    res.status(500).send('Error connecting to OpenAI');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




