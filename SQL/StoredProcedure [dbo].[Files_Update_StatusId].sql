USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Files_Update_StatusId]    Script Date: 6/25/2022 1:58:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Jonathan Rojo
-- Create date: 04/07/2022
-- Description: Update StatusId
-- Code Reviewer: Oscar Hernandez

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

-- =============================================

ALTER proc [dbo].[Files_Update_StatusId]
			 @id int
			,@statusId int


as

/*
	Declare  @id int = 9
			,@statusId int = 0

	Execute[dbo].[Files_Update_StatusId]
			 @id
			,@statusId

			SELECT * from dbo.files
			Where @id = Id
*/

BEGIN

	UPDATE [dbo].[Files]

	   SET [StatusId] = @statusId

	 WHERE Id = @id

END


