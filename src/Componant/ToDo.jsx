// state
import { useContext, useReducer } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';

import { ToastContext } from '../Context/ToastContext';
import { todosContext } from '../Context/TodosContext';



export default function ToDo({ todo, onDeleteClick, onEditClick }) {

    // context
    const { showHideToast } = useContext(ToastContext);
    const [, dispatch] = useContext(todosContext)


    // handel checked click function
    function handelCheckedTodo() {
        dispatch({ type: 'CHECKED_TODO', payload: { todo } })
        if (!todo.isCompleted) { showHideToast('The Mission Was Completed Successfully.') }
    }


    return (
        <>


            <Card className='cardOfTask' variant="outlined" sx={{ marginTop: '20px', borderRadius: '20px', backgroundColor: todo.isCompleted ? 'rgba(22, 154, 22, 0.25)' : 'white', color: todo.isCompleted ? "#fff	" : 'black' }}>
                <CardContent>

                    <Grid className='taskGridContainer' container spacing={2} sx={{ alignItems: 'center' }}>


                        <Grid className='taskContent' size={9} sx={{ textAlign: 'start', padding: '15px' }}>
                            <Typography sx={{ textDecoration: todo.isCompleted ? 'line-through' : 'none', fontWeight: 'bold' }} variant="h5">
                                {todo.title}
                            </Typography>
                            <p>{todo.details}</p>
                        </Grid>


                        <Grid className='taskBtns' size={3} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <IconButton onClick={() => { onDeleteClick(todo) }} className='deleteIcon' aria-label="delete" size="large" title='Delete'>
                                <DeleteIcon />
                            </IconButton>

                            <IconButton onClick={() => { onEditClick(todo) }} className='editeIcon' aria-label="create" size="large" title='Edite'>
                                <CreateIcon />
                            </IconButton>

                            <IconButton onClick={() => { handelCheckedTodo() }} className='checkIcon' aria-label="check" size="large" title='Done'>
                                <CheckIcon />
                            </IconButton>
                        </Grid>

                    </Grid>

                </CardContent>
            </Card >

        </>
    )
}
