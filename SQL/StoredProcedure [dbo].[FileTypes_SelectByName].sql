USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[FileTypes_SelectByName]    Script Date: 6/25/2022 1:59:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Jonathan Rojo
-- Create date: 03/30/2022
-- Description: This proc gets a fileTypes by Id within the dbo.FileTypes table.
-- Code Reviewer:Justin Alcala

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note:
-- =============================================

ALTER PROC [dbo].[FileTypes_SelectByName]
								@Input nvarchar(50)


as

/* ------ Test Code ------
Declare @Input nvarchar(50) = 'pdf'
Execute [FileTypes_SelectByName]
						@Input

*/
  
BEGIN

SELECT [Id]
  
  FROM [dbo].[FileTypes]
  WHERE Name = @Input

END

