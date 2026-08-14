function doPost(e) {
  const datos = JSON.parse(e.postData.contents);
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  hoja.appendRow([
    new Date(),
    datos.nombre,
    datos.cedula,
    datos.agencia,
    datos.horaEntrada,
    datos.horaSalida,
    datos.observaciones
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}


