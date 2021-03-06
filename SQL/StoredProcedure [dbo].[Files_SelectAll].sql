USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Files_SelectAll]    Script Date: 6/25/2022 1:57:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Nima Gopali
-- Create date: 03/23/2022
-- Description: This proc gets a paginated list of all Files within the dbo.Files table using a given pageIndex and pageSize.
-- Code Reviewer:

-- MODIFIED BY: Nima Gopali
-- MODIFIED DATE:03/24/2022
-- Code Reviewer: Dongyoung Yang
-- Note:

-- MODIFIED BY: Jonathan Rojo
-- MODIFIED DATE:04/7/2022
-- Code Reviewer: Nima Gopali
-- Note:

-- MODIFIED BY: Jonathan Rojo
-- MODIFIED DATE:05/10/2022
-- Code Reviewer: Oscar Hernandez
-- Note: only active files
-- =============================================

ALTER PROC [dbo].[Files_SelectAll]
						@pageIndex int
						,@pageSize int

as
/* ------ Test Code ------

Declare @pageIndex int = 0
		,@pageSize int = 2

Execute dbo.Files_SelectAll
					@pageIndex 
					,@pageSize 

*/

BEGIN

Declare @offSet int = @pageIndex * @pageSize

	SELECT f.[Id]
		  ,f.[FileName]
		  ,f.[Url]
		  ,f.[FileTypeId]
		  ,ft.Name as FileType
		  ,f.[CreatedBy]
		  ,f.[StatusId]
		  ,f.[DateCreated]
		  ,f.[DateModified]
		  ,TotalCount = COUNT(1) OVER()

  FROM [dbo].[Files] as f inner join [dbo].[FileTypes] as ft
							ON f.FileTypeId = ft.Id

  WHERE f.StatusId = 1
  ORDER BY f.Id

  OFFSET @offSet ROWS
  FETCH NEXT @pageSize ROWS ONLY

END
