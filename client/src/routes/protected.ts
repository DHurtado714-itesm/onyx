const unprotectedRoutes = new Set();
unprotectedRoutes.add("/iniciar-sesion");
unprotectedRoutes.add("/contact");
unprotectedRoutes.add("/faq");
unprotectedRoutes.add("/sobre-nosotros");

// manana la cambio :)
unprotectedRoutes.add("/medidas");

const protectedRoutes = new Set();
protectedRoutes.add("/info-registro");
protectedRoutes.add("/home");
protectedRoutes.add("/dietas");

const routes = {
    unprotectedRoutes,
    protectedRoutes
}

export default routes;