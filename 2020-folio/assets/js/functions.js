function zoom(elem) {
    let check = elem.classList.contains('zoom');
    console.log(check);
    if (check === true) {
        elem.classList.remove('zoom');
        console.log('Hello' + check);
    } else {
        elem.classList.add('zoom');
        // console.log(check);
    }

}