// Evita repetir try/catch em todos os controllers.
// Se uma Promise falhar, o erro é enviado para o middleware global de erro.
export function asyncHandler(controller) {
  return (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
}
