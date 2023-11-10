async function setup() {
    const patchExportURL = "rnbo-files/lines.export.json";
  
    // Create AudioContext
    const WAContext = window.AudioContext || window.webkitAudioContext;
    const context = new WAContext();
  
    // Create gain node and connect it to audio output
    const outputNode = context.createGain();
    outputNode.connect(context.destination);
  
    // Fetch the exported patcher
    let response, patcher;
    try {
      response = await fetch(patchExportURL);
      patcher = await response.json();
  
      if (!window.RNBO) {
        // Load RNBO script dynamically
        // Note that you can skip this by knowing the RNBO version of your patch
        // beforehand and just include it using a <script> tag
        await loadRNBOScript(patcher.desc.meta.rnboversion);
      }
    } catch (err) {
      const errorContext = {
        error: err
      };
      if (response && (response.status >= 300 || response.status < 200)) {
        (errorContext.header = `Couldn't load patcher export bundle`),
          (errorContext.description =
            `Check app.js to see what file it's trying to load. Currently it's` +
            ` trying to load "${patchExportURL}". If that doesn't` +
            ` match the name of the file you exported from RNBO, modify` +
            ` patchExportURL in app.js.`);
      }
      if (typeof guardrails === "function") {
        guardrails(errorContext);
      } else {
        throw err;
      }
      return;
    }
  
    // Create the device
    let device;
    try {
      device = await RNBO.createDevice({ context, patcher });
    } catch (err) {
      if (typeof guardrails === "function") {
        guardrails({ error: err });
      } else {
        throw err;
      }
      return;
    }
  
    device.node.connect(outputNode);

    context.suspend();
    const button=document.getElementById('start-button');
    button.addEventListener('click', () =>{
      context.resume();
      if(context.resume()){
        console.log('resumed');
      }else{
        console.log('failed?');
      }
    });
  
    sonify(device);
  
  }

  
  function sonify(device){
    const currentDate = new Date();
    const scale = device.parametersById.get('scale');
    scale.value = currentDate.getHours();
    console.log(scale.value);

    let target=device.parametersById.get('target');
    target.value=rnboTarget;
    console.log(target.value);

    let pan=device.parametersById.get('pan');
    pan.value=rnboPan;
    console.log(pan.value);

    let freq=device.parametersById.get('freq');
    freq.value=rnboFreq;
    console.log(freq.value);

    let tempo=device.parametersById.get('tempo');
    tempo.value=rnboTempo;
    console.log(tempo.value);
  }
  
  setup();