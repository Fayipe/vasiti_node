

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }
}


const reqpath = document.location;

const data = {
    reqpath,
    projectSlug: "blogger-afe17daa4960"
}


fetch('http://localhost:3000/api/v1/projects/page-request', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-type': 'application/json; charset=UTF-8'
    }
})
    .then((resp) => resp.json())
    .then(function (data) {
        //console.log(data)
        // data.filename = "https://pincop.s3.eu-west-1.amazonaws.com/pages/1614853392077.js"
        data.filename = "https://pincop.s3.eu-west-1.amazonaws.com/pages/1614854311602.js"
        const filename = data.filename;
        const filetype = "js"
        const resp = loadjscssfile(filename, filetype)
        console.log(resp)
        console.log(data)
        return
    })
    .catch(function (error) {
        console.log(error);
    });