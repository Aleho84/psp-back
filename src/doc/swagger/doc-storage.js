/**
 * @swagger
 * paths:
 *   /api/storage/imageUpload/:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: Upload image.
 *       description: Upload an image file [ jpg, jpeg, png, gif ].
 *       operationId: "imageUpload"
 *       tags:
 *         - Storage
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 file:
 *                   type: string
 *                   format: binary
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: OK. Image uploaded successfully.
 *         "400":
 *           description: Bad Request.
 *         "401":
 *           description: Unauthorized. Login faild.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/storage/imageFiles/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Get image file list.
 *       description: Get a list of all image files in the server.
 *       operationId: "imageFiles"
 *       tags:
 *         - Storage
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: OK. Image list fetched successfully.
 *         "401":
 *           description: Unauthorized. Login faild.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/storage/imageFiles/{name}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Download an image.
 *       description: Downloads the image defined in the "name" parameter.
 *       operationId: "imageFilesDownload"
 *       tags:
 *         - Storage
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: name
 *           in: path
 *           required: true
 *           description: Image file name
 *           schema:
 *             type: string
 *             example: test.png
 *       responses:
 *         "200":
 *           description: OK. Image downloaded successfully.
 *         "400":
 *           description: Bad Request.
 *         "401":
 *           description: Unauthorized. Login faild.
 *         "500":
 *           description: Internal Server Error.
 */

/**
 * @swagger
 * paths:
 *   /api/storage/imageFiles/{name}:
 *     delete:
 *       security:
 *         - bearerAuth: []
 *       summary: Delete an image.
 *       description: Delete the image defined in the "name" parameter.
 *       operationId: "imageFilesDelete"
 *       tags:
 *         - Storage
 *       parameters:
 *         - name: name
 *           in: path
 *           required: true
 *           description: Image file name
 *           schema:
 *             type: string
 *             example: test.png
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: OK. Image delete successfully.
 *         "400":
 *           description: Bad Request.
 *         "401":
 *           description: Unauthorized. Login faild.
 *         "500":
 *           description: Internal Server Error.
 */