var codes = document.querySelectorAll('code'), code, content, indent;
for (var i = 0; i < codes.length; i++) {
    code = codes[i];
    content = code.innerHTML;

    if (!(/^<!--/.test(content) && /-->$/.test(content)))
        continue;

    // remove comment
    content = content.replace(/^<!--\n?/, '');
    content = content.replace(/\s*-->$/, '');

    // shift indentation back
    content = content.replace(/^ +/gm, function(match) {
        if (typeof indent === 'undefined')
            indent = match.length;
        return match.substring(indent);
    });

    content = content.replace(/</g, '&lt;');
    content = content.replace(/>/g, '&gt;');

    code.innerHTML = content;
}

function browserIcon(browser) {
    switch (browser) {
        case 'cr': return 'resources/browser-logos.svg#chrome';
        case 'ff': return 'resources/browser-logos.svg#firefox';
        case 'ie': return 'resources/browser-logos.svg#internet-explorer';
        case 'o': return 'resources/browser-logos.svg#opera';
        case 's': return 'resources/browser-logos.svg#safari';
        case 'ios': return 'resources/browser-logos.svg#ios';
        case 'a': return 'resources/browser-logos.svg#android';
        default: return null;
    }
}

var supports = document.querySelectorAll('table.support'), support;
for (i = 0; i < supports.length; i++) {
    support = supports[i];
    content = support.innerHTML;

    if (!(/^<!--/.test(content) && /-->$/.test(content)))
        continue;

    // remove comment
    content = content.replace(/^<!--\n?/, '');
    content = content.replace(/\s*-->$/, '');

    content = JSON.parse(content);
    var browsers = document.createElement('tr'),
        versions = document.createElement('tr'),
        td, img;

    for (var browser in content) {
        td = document.createElement('td');
        img = document.createElement('img');
        img.setAttribute('src', browserIcon(browser));
        img.setAttribute('class', 'plain');
        td.appendChild(img);
        browsers.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = content[browser].version;
        td.setAttribute('class', content[browser].support);
        versions.appendChild(td);
    }
    support.appendChild(browsers);
    support.appendChild(versions);
}

// if (Reveal.getQueryHash().notes) {
    Reveal.addEventListener( 'slidechanged', function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
        var notes = event.currentSlide.querySelector(".notes");
        if(notes) {
            console.info(notes.innerHTML.replace(/\n\s+/g,'\n'));
        }
    } );
// }