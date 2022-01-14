export function debounce(calback, mills = 500) {
    let timer = null;
    return (...args) => {
        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout( () =>  {calback(args)}, 1000);
    }
}