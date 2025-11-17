function renderMessage(content) {
  // nejdříve escapujeme HTML
  let safe = escapeHtml(String(content));

  // nahradíme code blocky ```java\n...\n``` nebo ```\n...\n```
  safe = safe.replace(/```(?:java)?\n([\s\S]*?)```/g, function(_, code) {
    // escapujeme obsah kódu
    let codeSafe = escapeHtml(code);

    // zkrátíme dlouhé řádky (více než 200 znaků)
    codeSafe = codeSafe
      .split('\n')
      .map(line => line.length > 200 ? line.slice(0, 200) + '...' : line)
      .join('\n');

    return '<pre><code>' + codeSafe + '</code></pre>';
  });

  // zbytek nových řádků převedeme na <br>, ale neuvnitř code blocků
  safe = safe.replace(/\n/g, '<br>');
  return safe;
}
