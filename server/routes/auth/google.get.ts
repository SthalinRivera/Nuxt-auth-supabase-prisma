import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default oauth.googleEventHandler({
  async onSuccess(event, { user, tokens }) {
    //comprueba si tienes un usuario
    let usuario = await prisma.usuario.findUnique({
      where: {
        email: user.email,
      },
      include: {
        permiso: true,
      },
    })
    //si no hay usuario crear nuevo

    if (!usuario) {
      const PERMISO_USUARIO = 2;
      usuario = await prisma.usuario.create({
        data: {
          email: user.email,
          name: user.name,
          permisoID: PERMISO_USUARIO,
        },
        include: {
          permiso: true,
        }
      })

    }

    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        urlFoto: user.picture,
        name: String(user.name).trim(),
        permiso: usuario.permiso.name,
        usuarioId: usuario?.id,
      },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.log("Error Google Auth", error);
    return sendRedirect(event, "/");
  },
});



