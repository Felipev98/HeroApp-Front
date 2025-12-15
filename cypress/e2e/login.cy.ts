describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('debe mostrar el formulario de login', () => {
    cy.contains('Iniciar Sesión').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('debe mostrar error al enviar el formulario vacío', () => {
    cy.get('button[type="submit"]').click();
    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="password"]:invalid').should('exist');
  });

  it('debe mostrar toast de error con credenciales inválidas', () => {
    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.swal2-toast', { timeout: 5000 }).should('be.visible');
    cy.get('.swal2-toast').should('contain', 'Error');
  });

  it('debe cambiar al modo registro', () => {
    cy.contains('Iniciar Sesión').should('be.visible');
    
    cy.contains('¿No tienes cuenta? Regístrate').click();
    
    cy.contains('Registro').should('be.visible');
    cy.get('input[type="text"]').first().should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('debe mostrar error de validación para contraseña corta en modo registro', () => {
    cy.contains('¿No tienes cuenta? Regístrate').click();
    
    cy.get('input[type="text"]').first().type('testuser');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('12345'); 
    cy.get('button[type="submit"]').click();
    
    cy.get('.swal2-toast', { timeout: 5000 }).should('be.visible');
    cy.get('.swal2-toast').should('contain', '6 caracteres');
  });

  it('debe iniciar sesión exitosamente con credenciales válidas', () => {
    const testEmail = 'felipe9998@gmail.com';
    const testPassword = 'Pipito1234$';
    
    cy.get('input[type="email"]').type(testEmail);
    cy.get('input[type="password"]').type(testPassword);
    cy.get('button[type="submit"]').click();
    
    cy.wait(15000);
    
    cy.url({ timeout: 30000 }).should('include', '/heroes');
    
    cy.contains('Todos los Héroes', { timeout: 15000 }).should('be.visible');
  });

  it('debe mostrar spinner de carga al enviar el formulario', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.get('.spinner-border', { timeout: 1000 }).should('be.visible');
  });

  it('debe navegar al login desde la página de inicio', () => {
    cy.visit('/');
    
    cy.contains('Inicia tu aventura').click();
    
    cy.url().should('include', '/login');
    cy.contains('Iniciar Sesión').should('be.visible');
  });
});

