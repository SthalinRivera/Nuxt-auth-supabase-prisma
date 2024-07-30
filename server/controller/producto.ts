import { Video } from "~/interfaces/video";
import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
import { Categoria } from "~/interfaces/categoria";
import { Producto } from "~/interfaces/producto";
const prisma = new PrismaClient();
const { client } = postgresClient();

export const buscarTodos = async () => {
  return await prisma.producto.findMany({
    orderBy: {
      id_producto: "asc"
    }
  })
}
export const buscaPorId = async (event: H3Event) => {
  const request = getRouterParams(event);
  if (!request.id) {
    throw createError({
      statusCode: 400,
      name: "video invalido",
      //  message: error.message  
    });
  }
  const video = prisma.video.findFirst({
    where: {
      id: +request.id,
    }
  })
  return !video ? "video no encontrado" : video;
};


export const adicionar = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody<Producto>(event);
    await prisma.producto.create({
      data: {
        ...request,
      },
    });
    return "Producto agregado!";
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error crear producto",
       message: error.message  
    });
  }
};

export const actuliazar = async (event: H3Event): Promise<string> => {
  try {
    const requestBody = await readBody(event);
    const request = await readBody(event);

    if (!request.id) {
      throw createError({
        statusCode: 400,
        name: "video invalido",
        //  message: error.message  
      });
    }
    await prisma.video.update({
      where: {
        id: +request.id,
      },
      data:{
      description: requestBody.description,
      url: requestBody.url,
    },
  });
  return "Video actualizado!";
} catch (error) {
  throw createError({
    statusCode: 500,
    name: "Error al actulizar video",
    //  message: error.message  
  });
}
};

export const eliminar = async (event: H3Event) => {
  try {
    const requestBody = await readBody(event);
    const request = await readBody(event);

    if (!request.id) {
      throw createError({
        statusCode: 400,
        name: "video invalido",
        //  message: error.message  
      });
    }
    await prisma.video.delete({
      where: {
        id: +request.id,
      },

  });

    return "Video eliminado"
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error al eliminar",
      //  message: error.message 
    });
  }
};
