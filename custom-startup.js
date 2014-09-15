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
        case 'cr': return 'resources/chrome.png';
        case 'ff': return 'resources/firefox.png';
        case 'ie': return 'resources/internet-explorer.png';
        case 'o': return 'resources/opera.png';
        case 's': return 'resources/safari.png';
        case 'ios': return 'resources/mobile-browsers.svg#ios';
        case 'a': return 'resources/mobile-browsers.svg#android';
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
        td.appendChild(img);
        browsers.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = content[browser];
        versions.appendChild(td);
    }
    support.appendChild(browsers);
    support.appendChild(versions);
}
