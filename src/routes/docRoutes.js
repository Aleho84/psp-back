import express from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import packageJson from '../../package.json' assert {type: "json"}
import path from 'path'
import 'dotenv/config'

import {
    __dirname,
    PROTOCOL,
    HOST_PUBLIC,
    HOST_LOCAL,
    PORT
} from '../config/constant.js'

const SERVER_SWAGGER = `${PROTOCOL}://${HOST_PUBLIC}:${PORT}`
const SERVER_SWAGGER_LOCAL = `${PROTOCOL}://${HOST_LOCAL}:${PORT}`
const swaggerApp = express()

// Swagger 
const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: packageJson.name.toUpperCase(),
            version: packageJson.version,
            description: `DOCUMENTACION - ${packageJson.description}`,
            contact: {
                name: packageJson.author.name,
                email: packageJson.author.email,
                url: packageJson.author.url
            }
        },
        servers: [{ url: SERVER_SWAGGER }, { url: SERVER_SWAGGER_LOCAL }]
    },
    apis: [
        path.join(__dirname, '../doc/swagger/swagger-tags.js'),
        path.join(__dirname, '../doc/swagger/swagger-models.js'),
        path.join(__dirname, '../doc/swagger/doc-users.js'),
        path.join(__dirname, '../doc/swagger/doc-storage.js'),
        path.join(__dirname, '../doc/swagger/doc-logs.js'),
    ]
}

const swaggerUIOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: packageJson.name,
    customfavIcon: "/ico/favicon.ico"
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
swaggerApp.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerUIOptions))

export default swaggerApp