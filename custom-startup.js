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
    content = content.replace(/ +/g, function(match) {
        if (typeof indent === 'undefined')
            indent = match.length;
        return match.substring(indent);
    });

    content = content.replace(/</g, '&lt;');
    content = content.replace(/>/g, '&gt;');

    code.innerHTML = content;
}
