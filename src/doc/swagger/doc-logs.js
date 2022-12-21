/**
 * @swagger
 * paths:
 *   /api/logs/:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Get server logs.
 *       description: Get logs from the servers.
 *       operationId: "logs"
 *       tags:
 *         - Logs
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: OK. Logs fetched successfully.
 *         "401":
 *           description: Unauthorized. Login faild.
 *         "500":
 *           description: Internal Server Error.
 */