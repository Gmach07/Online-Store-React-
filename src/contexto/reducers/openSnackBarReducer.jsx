const initialState = {
    open: false,
    mensaje: ""
}

const openSnackBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_SNACKBAR":
            return {
                ...state,
                open: true,
                mensaje: action.payload.mensaje
            };
        case "CLOSE_SNACKBAR":
            return {
                ...state,
                open: false,
                mensaje: ""
            };
        default:
            return state;
    }
}

export default openSnackBarReducer;