const { test, expect } = require('@playwright/test');

test.describe('Pruebas del formulario de contacto', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost/ROCIO/exercicio-1/index.html'); //
  });

  test('Enviar formulario válido', async ({ page }) => {
    await page.fill('#nombre', 'Juan Pérez');
    await page.fill('#email', 'juan@example.com');
    await page.fill('#mensaje', 'Este es un mensaje válido.');
    await page.click('button[type="submit"]');
    
    // Esperamos a la alerta y comprobamos su texto
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Formulario enviado correctamente');
      await dialog.accept();
    });
  });

  test('Enviar formulario vacío', async ({ page }) => {
    await page.click('button[type="submit"]');

    // El formulario debería mostrar los mensajes de error, así que comprobamos que las clases invalid-feedback estén visibles
    const nombreErrorVisible = await page.isVisible('#nombre:invalid');
    const emailErrorVisible = await page.isVisible('#email:invalid');
    const mensajeErrorVisible = await page.isVisible('#mensaje:invalid');

    expect(nombreErrorVisible).toBe(true);
    expect(emailErrorVisible).toBe(true);
    expect(mensajeErrorVisible).toBe(true);
  });

});
