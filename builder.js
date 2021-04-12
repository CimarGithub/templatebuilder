let code_display
let code_editor
let subject_line
let copy_html
let set_html
let email_display
let preview_display
let code
let html_display
let set_preview
let set_email

document.addEventListener('DOMContentLoaded', function(){
    code_editor = document.querySelector('.raw_editor')
    copy_html = document.querySelector('.copy_button')
    set_html = document.querySelector('#display_html')
    code_display = document.querySelector('.raw_code')
    subject_line = document.querySelector('#subject_text')
    preview_line = document.querySelector('#preview_text')
    email_display = document.querySelector('.visual_email')
    preview_display = document.querySelector('.visual_preview')
    html_display = document.querySelector('#html_copy')
    set_preview = document.querySelector('#display_preview')
    set_email = document.querySelector('#display_email')

    subject_line.addEventListener('keyup', function(){
        check_submit()
    })

    preview_line.addEventListener('keyup', function(){
        check_submit()
    })

    set_preview.addEventListener('click', function(){
        html_display.style.display = "none"
        email_display.style.display = "none"
        preview_display.style.display = "block"
    })

    set_email.addEventListener('click', function(){
        html_display.style.display = "none"
        email_display.style.display = "block"
        preview_display.style.display = "none"
    })

    set_html.addEventListener('click', function(){
        html_display.style.display = "block"
        email_display.style.display = "none"
        preview_display.style.display = "none"
        
    })

    copy_html.addEventListener('click', function(){
        html_display.style.display = "block"
        preview_display.style.display = "none"
        email_display.style.display = "none"
        setTimeout(() => {
            copy_to_clipboard('html_copy')
            html_display.style.display = "none"
            preview_display.style.display = "none"
        }, 200); 

    })

    setTimeout(() => {
        let demo_display = document.querySelector('#custom_content').innerHTML
        tinyMCE.activeEditor.setContent(demo_display)
        load_code()
        load_preview()
    }, 500); 

    html_display.style.display = "none"
})

function load_code(){
    let input = tinyMCE.activeEditor.getContent()
    document.querySelector('#custom_content').innerHTML = input
    code_display.innerHTML = input
    convert_html()
}

function convert_html(){
    let custom_preview = document.querySelector('#custom_preview_id')
    custom_preview.innerHTML = preview_line.value

    let custom_code = document.querySelector('#custom_content_id')
    console.log(custom_code)
    custom_code.innerHTML = code_display.innerHTML

    let code = document.querySelector('#top_template').innerHTML

    let newcode = ""
    for (let i = 0; i < code.length; i++){
        // Find Tags
        if (code[i] === '<'){
            newcode += '&lt'
        
        }else if (code[i] === '>'){
            newcode += '&gt'
        }

        //Pretty Print
        else if (code[i] === '\n'){
            newcode += '<br>\n'
        }
        
        else {
            newcode += code[i]
        }
    }
    code_display.innerHTML = subject_line.value + "<br>"
    code_display.innerHTML += newcode
}

function copy_to_clipboard(div_id) {
    var range = document.createRange();
    range.selectNode(document.getElementById(div_id));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
    alert("THE HTML HAS BEEN COPIED")
    email_display.style.display = "block"
}

function load_preview(){
    let subject = subject_line.value
    let preview = preview_line.value

    document.querySelectorAll('#subject_preview').forEach(content =>{
        content.innerHTML = subject
    })
    document.querySelectorAll('#preview_preview').forEach(content =>{
        content.innerHTML = preview
    })
}

function check_submit(){
    load_code()
    load_preview()
}