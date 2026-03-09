import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import recetaRoutes from './routes/receta.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import authRoutes from './routes/auth.routes.js';
import ingredienteRoutes from './routes/ingrediente.routes.js'
import platilloRoutes from './routes/platillo.routes.js';
import categoriaGlobalRoutes from './routes/categoriaGlobal.routes.js';
import subcategoriaRoutes from './routes/subcategoria.routes.js';
import recetaRouter from './routes/receta.routes.js';
import platilloOpcionalRoutes from './routes/platilloOpcional.routes.js';
import configuracionPreciosRoutes from './routes/configuracionPrecios.routes.js';
import platilloPrecioRoutes from './routes/platilloPrecio.routes.js';
import precioMotorRoutes from './routes/precioMotor.routes.js';
import unidadRoutes from './routes/unidad.routes.js';
import componenteRoutes from './routes/componente.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/recetas', recetaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ingredientes', ingredienteRoutes);
app.use('/api/platillos', platilloRoutes);
app.use('/api/categorias-globales', categoriaGlobalRoutes);
app.use('/api/subcategorias', subcategoriaRoutes);
app.use('/api/recetas', recetaRouter);
app.use('/api/platillo-opcional', platilloOpcionalRoutes);
app.use('/api/configuracion-precios', configuracionPreciosRoutes);
app.use('/api/platillo-precio', platilloPrecioRoutes);
app.use('/api/recalcular-precio', precioMotorRoutes);
app.use('/api/unidades', unidadRoutes);
app.use('/api/componentes', componenteRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
