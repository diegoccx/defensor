const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Para conseguir trabalhar com o corpo das requisições POST em JSON

// Dados simulados
let customers = [
    { id: 1, name: 'João Silva', email: 'joao.silva@gmail.com' },
    { id: 2, name: 'Maria Oliveira', email: 'maria.oliveira@gmail.com' },
    { id: 3, name: 'Pedro Costa', email: 'pedro.costa@gmail.com' }
];

let accounts = [
    { accountId: '12345', balance: 5000, currentPage: 0, totalPages: 1, pageSize: 10, accountOperationDTOS: [] },
    { accountId: '67890', balance: 12000, currentPage: 0, totalPages: 1, pageSize: 10, accountOperationDTOS: [] }
];

// Endpoint para buscar todos os clientes
app.get('/customers', (req, res) => {
    res.json(customers);
});

// Endpoint para buscar clientes por palavra-chave
app.get('/customers/search', (req, res) => {
    const { keyword } = req.query;
    const filteredCustomers = customers.filter(customer => 
        customer.name.toLowerCase().includes(keyword.toLowerCase()) || 
        customer.email.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json(filteredCustomers);
});

// Endpoint para salvar um novo cliente
app.post('/customers', (req, res) => {
    const newCustomer = req.body;
    newCustomer.id = customers.length + 1; // Simula a criação de um ID
    customers.push(newCustomer);
    res.json(newCustomer);
});

// Endpoint para excluir um cliente
app.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    customers = customers.filter(customer => customer.id != id);
    res.status(200).send('Cliente deletado com sucesso');
});

// Endpoint para obter detalhes da conta
app.get('/accounts/:accountId/pageOperations', (req, res) => {
    const { accountId } = req.params;
    const { page, size } = req.query;
    
    // Encontra a conta pelo accountId
    const account = accounts.find(account => account.accountId === accountId);
    
    if (!account) {
        return res.status(404).send('Conta não encontrada');
    }

    // Simula a paginação
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const accountOperations = account.accountOperationDTOS.slice(startIndex, endIndex);
    
    res.json({
        accountId: account.accountId,
        balance: account.balance,
        currentPage: parseInt(page),
        totalPages: Math.ceil(account.accountOperationDTOS.length / size),
        pageSize: parseInt(size),
        accountOperationDTOS: accountOperations
    });
});

// Endpoint para realizar débito em uma conta
app.post('/accounts/debit', (req, res) => {
    const { accountId, amount, description } = req.body;
    const account = accounts.find(account => account.accountId === accountId);
    
    if (!account) {
        return res.status(404).send('Conta não encontrada');
    }

    if (account.balance < amount) {
        return res.status(400).send('Saldo insuficiente');
    }

    account.balance -= amount;
    account.accountOperationDTOS.push({ id: account.accountOperationDTOS.length + 1, operationDate: new Date(), amount: -amount, type: 'DEBIT', description });
    res.status(200).send('Débito realizado com sucesso');
});

// Endpoint para realizar crédito em uma conta
app.post('/accounts/credit', (req, res) => {
    const { accountId, amount, description } = req.body;
    const account = accounts.find(account => account.accountId === accountId);

    if (!account) {
        return res.status(404).send('Conta não encontrada');
    }

    // Converte amount para número antes de somar
    account.balance += Number(amount);
    account.accountOperationDTOS.push({
        id: account.accountOperationDTOS.length + 1,
        operationDate: new Date(),
        amount: Number(amount),
        type: 'CREDIT',
        description
    });

    res.status(200).send('Crédito realizado com sucesso');
});

// Endpoint para transferir entre contas
app.post('/accounts/transfer', (req, res) => {
    const { accountSource, accountDestination, amount, description } = req.body;
    const sourceAccount = accounts.find(account => account.accountId === accountSource);
    const destinationAccount = accounts.find(account => account.accountId === accountDestination);
    
    if (!sourceAccount || !destinationAccount) {
        return res.status(404).send('Conta de origem ou destino não encontrada');
    }

    if (sourceAccount.balance < amount) {
        return res.status(400).send('Saldo insuficiente na conta de origem');
    }

    sourceAccount.balance -= amount;
    destinationAccount.balance += amount;

    sourceAccount.accountOperationDTOS.push({ id: sourceAccount.accountOperationDTOS.length + 1, operationDate: new Date(), amount: -amount, type: 'TRANSFER', description });
    destinationAccount.accountOperationDTOS.push({ id: destinationAccount.accountOperationDTOS.length + 1, operationDate: new Date(), amount: amount, type: 'TRANSFER', description });

    res.status(200).send('Transferência realizada com sucesso');
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Backend rodando na porta ${port}`);
});
