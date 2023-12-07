const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));


const supabaseUrl = 'https://jfcjlrgwbsavdaezeryj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmY2pscmd3YnNhdmRhZXplcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NzQwNzQsImV4cCI6MjAxNzU1MDA3NH0.b9qtwx9DdFnuF41AVojezu_1M4MKpLyOr7Q9xfjJmz8'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


app.get('/', (req, res) => {
    res.sendFile('public/INST377-Week10-PPT.html', { root: __dirname})
})

app.get('/customers', async (req, res) => {
    console.log('Getting Customer')

    const {data, error} = await supabase
        .from('Customer')
        .select();

    if(error) {
        console.log(error)
    } else if(data) {
        res.send(data)
    }
})


app.post('/customer', async (req, res) => {
    console.log('Adding Customer')

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var state = req.body.state;

    const {data, error} = await supabase
        .from('Customer')
        .insert([
            {'cust_first_name': firstName, 'cust_last_name': lastName, 'cust_state': state}
        ])
        .select();

    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})

app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE')
})

