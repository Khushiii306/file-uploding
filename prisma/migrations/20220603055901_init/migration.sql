-- CreateTable
CREATE TABLE "fileData" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,

    CONSTRAINT "fileData_pkey" PRIMARY KEY ("id")
);
