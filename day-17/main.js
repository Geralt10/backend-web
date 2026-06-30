import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import "dotenv/config"
import { RecursiveCharacterTextSplitter, TextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from '@pinecone-database/pinecone';


const pc = new Pinecone({
  apiKey:process.env.PINECONE_API_KEY,
});

const index = pc.index('rag-practice');

const loader = new PDFLoader("./story.pdf");

const docs = await loader.load();

const embeddings = new MistralAIEmbeddings({
    apiKey:process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})


const textsplitters = new RecursiveCharacterTextSplitter({
    chunkSize:500,
    chunkOverlap:100,
})



const allSplits = await textsplitters.splitDocuments(docs);


const chunks = allSplits.map((doc)=>doc.pageContent)

const docsEmbed =await Promise.all(chunks.map(async(chunk)=>{
    const embedding= await embeddings.embedQuery(chunk);
    return{
        text:chunk,
        embedding
    }
}))

// const result = await index.upsert({
//     records:docsEmbed.map((doc,i)=>({
//         id:`doc-${i}`,
//         values:doc.embedding,
//         metadata:{
//             text:doc.text
//         }

//     }))
// })

const queryEmbeddings = await embeddings.embedQuery("how was his internship experience");

const result = await index.query({
    vector:queryEmbeddings,
    topK:2,
    includeMetadata:true
})

console.log(result)