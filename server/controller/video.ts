import { Video } from "~/interfaces/video";
import { postgresClient } from "../utils";
import { H3Event } from "h3";
const { client } = postgresClient();

export const buscaVideos = async () => {
  const resultado = await client.query('SELECT * FROM videos ORDER BY description ASC ');
  return resultado.rows as Video[];
}
export const buscaVideoPorId = async (event: H3Event) => {
  const requestId = (await event.context.params?.id) as string;
  console.log(requestId);
  const resultado = await client.query("SELECT * FROM videos where id = $1", [
    requestId,
  ]);
  return resultado.rows[0] as Video;
};

export const adicionaVideo = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody(event);
    await client.query(
      "INSERT INTO videos (description, url, data_potagem ) VALUES ($1, $2, CURRENT_DATE)",
      [request.description, request.url]
    );
    return "Video agregado!";
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error crear video",
      // message: error.message  
    });
  }
};

export const actuliazaVideo = async (event: H3Event): Promise<string> => {
  try {
    const request = await readBody(event);
    await client.query(
      "UPDATE videos  SET description = $1 , url=$2, data_potagem = CURRENT_DATE WHERE id=$3",
      [request.description, request.url, request.id]
    );
    return "Video actualizado!";
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error al actulizar video",
      //  message: error.message  
    });
  }
};

export const eliminarVideos = async (event: H3Event) => {
  try {
    const requestId = (await event.context.params?.id) as string;
    console.log(requestId);
    const resultado = await client.query("DELETE FROM videos where id = $1", [
      requestId,
    ]);

    return "Video eliminado"
  } catch (error) {
    throw createError({
      statusCode: 500,
      name: "Error al eliminar",
      //  message: error.message 
    });
  }
};
