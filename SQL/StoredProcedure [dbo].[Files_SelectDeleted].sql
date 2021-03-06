USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Files_SelectDeleted]    Script Date: 6/25/2022 1:58:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Jonathan Rojo
-- Create date: 04/07/2022
-- Description: This proc is used to get deleted and paginated files
-- Code Reviewer: Oscar Hernandez

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:

-- =============================================

ALTER proc [dbo].[Files_SelectDeleted]
				 @pageIndex int 
				,@pageSize int
AS

/*
 Declare  @pageIndex int = 0 
         ,@pageSize int	= 4
    
 Execute dbo.Files_SelectDeleted
		 @pageIndex
		,@pageSize

*/

BEGIN

	Declare @offset int = @pageIndex * @pageSize


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

	WHERE f.StatusId = 0
		ORDER BY f.Id

	OFFSET @offSet Rows
	Fetch Next @pageSize Rows ONLY

END