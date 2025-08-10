//states 
import { useState, useEffect, useContext, useMemo } from 'react';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContext } from '../Context/ToastContext';

// allarts
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';

// Componant
import ToDo from './ToDo';

// context
import { todosContext } from '../Context/TodosContext';


export default function ToDoList() {

    const [todos, dispatch] = useContext(todosContext);
    const { showHideToast } = useContext(ToastContext);

    // stats
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [activeFilter, setDisplayTodosType] = useState("all");
    const [updatedTodo, setUpdatedTodo] = useState({ title: '', details: '' });
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [showEditeAllert, setShowEditeAllert] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);


    // handle add click function
    function handleAddTodo() {
        dispatch({ type: "ADD_TODO", payload: { newTaskTitle } })
        setNewTaskTitle("");
        showHideToast('Added successfully')
    }

    // handel delete click function 
    function handelDeleteTodo() {
        dispatch({ type: 'DELETE_TODO', payload: { id: selectedTodo.id } })
        setIsDeleteDialogOpen(false);
        showHideToast('The Task Has Been Successfully Deleted')
    }

    // handel edit click function 
    function handelEditClick() {
        dispatch({ type: 'UPDATE_TODO', payload: { updatedTodo, selectedTodo } })
        setShowEditeAllert(false);
        showHideToast('The Task Has Been Successfully Modified.')
    }


    // check local storage data
    useEffect(() => {
        const todosDataFromLocalStorage = localStorage.getItem("todos");
        if (todosDataFromLocalStorage) {
            dispatch({ type: "INITIALIZE_TODOS", payload: JSON.parse(todosDataFromLocalStorage) });
        }
    }, []);

    // filtering todos
    const completedTodos = useMemo(() => { return todos.filter((t) => t.isCompleted) }, [todos]) // completed
    const notCompletedTodos = useMemo(() => { return todos.filter((t) => !t.isCompleted); }, [todos]) // not completed
    let todosToBeRender = todos; // all

    if (activeFilter === "completed") todosToBeRender = completedTodos;
    if (activeFilter === "notCompleted") todosToBeRender = notCompletedTodos;


    // allerts 

    function openDeleteDialog(data) {
        setIsDeleteDialogOpen(true)
        setSelectedTodo(data)
    }

    function openEditDialog(data) {
        setShowEditeAllert(true)
        setSelectedTodo(data)
        setUpdatedTodo({ title: data.title, details: data.details });
    }


    const todoList = todosToBeRender.map((t) => <ToDo key={t.id} todo={t} onDeleteClick={openDeleteDialog} onEditClick={openEditDialog} />);

    return (
        <>

            {/* delet allert */}

            <Dialog onClose={() => { setIsDeleteDialogOpen(false) }} sx={{ textAlign: 'center' }}
                open={isDeleteDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ margin: '20px 0 0' }} id="alert-dialog-title">
                    {"Are You Sure You Want To Delete This Task?"}
                </DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description">
                        If You Delete It, You Won't Be Able To Get It Back.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setIsDeleteDialogOpen(false) }} >Disagree</Button>
                    <Button onClick={() => { handelDeleteTodo() }}



                        autoFocus
                        sx={{ backgroundColor: '#2196f3', color: 'white' }}
                    >
                        Agree
                    </Button>
                </DialogActions>
            </Dialog >

            {/* === delet allert === */}

            {/* edite allert */}

            <Dialog onClose={() => { setShowEditeAllert(false) }} sx={{ textAlign: 'center' }} open={showEditeAllert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >

                <DialogContent >

                    <TextField autoFocus
                        margin="dense"
                        id="name"
                        name="title"
                        label="Task Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                        value={updatedTodo.title} onChange={(e) => { setUpdatedTodo({ ...updatedTodo, title: e.target.value }) }} required />

                    <TextField margin="dense" id="name" name="details" label="Details" type="text" fullWidth variant="standard" autoComplete='off' value={updatedTodo.details} onChange={(e) => { setUpdatedTodo({ ...updatedTodo, details: e.target.value }) }} />

                </DialogContent>


                <DialogActions>
                    <Button onClick={() => { setShowEditeAllert(false) }} >Disagree</Button>

                    <Button onClick={() => { handelEditClick() }}
                        disabled={
                            !selectedTodo ||
                            (updatedTodo.title.trim().length === 0 && updatedTodo.details.trim().length === 0) ||
                            (selectedTodo.title.trim() === updatedTodo.title.trim() && selectedTodo.details.trim() === updatedTodo.details.trim())
                        } >
                        Agree
                    </Button>

                </DialogActions>

            </Dialog >

            {/* === edite allert ===  */}


            <Container sx={{ margin: "50px 0" }} maxWidth="md">
                <Card className="todo-list" variant="outlined" sx={{ borderRadius: "20px", padding: "30px" }}>

                    <CardContent>

                        <Typography sx={{ margin: "0 0 25px", fontWeight: "bold" }} variant="h3" component="div">
                            To-do List
                        </Typography>

                        <Divider />

                        {/* FILTER BUTTONS */}
                        <ToggleButtonGroup
                            color="primary"
                            value={activeFilter}
                            exclusive
                            onChange={(e) => setDisplayTodosType(e.target.value)}
                            aria-label="Platform"
                            sx={{ margin: "30px", boxShadow: "0 5px 10px #ddd" }}
                        >

                            <ToggleButton sx={{ fontWeight: "bolder" }} value="all">All</ToggleButton>
                            <ToggleButton sx={{ fontWeight: "bolder" }} value="completed">Done</ToggleButton>
                            <ToggleButton sx={{ fontWeight: "bolder" }} value="notCompleted">Not Done </ToggleButton>\

                        </ToggleButtonGroup>

                        {/* To Do List */}

                        <div className="todo-scroll" style={{ padding: "10px", maxHeight: "400px", overflowY: "scroll" }}>

                            {todoList}

                        </div>

                        {/* === To Do List === */}

                        {/* Add Task Section */}
                        <div className='addTaskContainer' style={{ marginTop: '40px' }}>

                            <Grid container spacing={2} sx={{ height: '55px', alignItems: 'center' }}>

                                <Grid size={3} sx={{ height: '55px' }} >
                                    <Button onClick={() => { handleAddTodo() }} sx={{ height: '100%', width: '100%' }} variant="contained" disabled={newTaskTitle.trim().length === 0}>Add</Button>
                                </Grid>

                                <Grid size={9} sx={{ height: '55px' }}>
                                    <TextField value={newTaskTitle} onChange={(e) => { setNewTaskTitle(e.target.value) }} sx={{ height: '100%', width: '100%' }} id="outlined-text-input" label="Task Title" type="text" autoComplete='off' />
                                </Grid>

                            </Grid>

                        </div>

                    </CardContent>

                </Card>
            </Container>
        </>
    );
}


