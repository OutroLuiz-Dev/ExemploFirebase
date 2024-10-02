import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove, push } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCvYT93c2tSFQ8iyvqprDpWVIMtHtuTgmA",
    authDomain: "honorina-82a7c.firebaseapp.com",
    databaseURL: "https://honorina-82a7c-default-rtdb.firebaseio.com",
    projectId: "honorina-82a7c",
    storageBucket: "honorina-82a7c.appspot.com",
    messagingSenderId: "282741363642",
    appId: "1:282741363642:web:ba5308ed05481279f60383"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// POST (CRIA UM NOVO ALUNO)
async function createAluno(nome, RA, idade, serie) {
    try {
        const newAlunoRef = push(ref(db, 'alunos'));  // Cria um novo registro único
        await set(newAlunoRef, {
            nome: nome,
            RA: RA,
            idade: idade,
            serie: serie
        });
        console.log(`Aluno ${nome} cadastrado com sucesso.`);
    } catch (error) {
        console.error("Erro ao cadastrar o aluno:", error);
    }
}





// GET (OBTER TODOS OS ALUNOS)
async function getAllAlunos() {
    try {
        const alunosRef = ref(db, 'alunos/');
        const snapshot = await get(alunosRef);
        if (snapshot.exists()) {
            console.log("Dados de todos os alunos:", snapshot.val());
        } else {
            console.log("Nenhum aluno encontrado.");
        }
    } catch (error) {
        console.error("Erro ao obter os dados dos alunos:", error);
    }
}



// PUT ( ATUALIZA PELO R.A.)
async function updateAluno(RA, updatedData) {
    try {
        const alunosRef = ref(db, 'alunos/');
        const snapshot = await get(alunosRef);
        if (snapshot.exists()) {
            const alunos = snapshot.val();
            const alunoKey = Object.keys(alunos).find(key => alunos[key].RA === RA);
            if (alunoKey) {
                await update(ref(db, `alunos/${alunoKey}`), updatedData);
                console.log(`Dados do aluno com RA ${RA} atualizados com sucesso.`);
            } else {
                console.log(`Aluno com RA ${RA} não encontrado.`);
            }
        }
    } catch (error) {
        console.error("Erro ao atualizar os dados do aluno:", error);
    }
}




// DELETE (DELETA PELO R.A.)
async function deleteAluno(RA) {
    try {
        const alunosRef = ref(db, 'alunos/');
        const snapshot = await get(alunosRef);
        if (snapshot.exists()) {
            const alunos = snapshot.val();
            const alunoKey = Object.keys(alunos).find(key => alunos[key].RA === RA);
            if (alunoKey) {
                await remove(ref(db, `alunos/${alunoKey}`));
                console.log(`Aluno com RA ${RA} removido com sucesso.`);
            } else {
                console.log(`Aluno com RA ${RA} não encontrado.`);
            }
        }
    } catch (error) {
        console.error("Erro ao remover o aluno:", error);
    }
}


