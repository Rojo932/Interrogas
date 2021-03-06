USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Files_GetByFileTypeId_Paginated]    Script Date: 6/25/2022 1:55:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Jonathan Rojo
-- Create date: 04/07/2022
-- Description: This proc is used to get paginated files by TypeId from dbo.Files table.
-- Code Reviewer: Nima Gopali

-- MODIFIED BY: Jonathan Rojo
-- MODIFIED DATE:05/10/2022
-- Code Reviewer: Oscar Hernandez
-- Note: only active files
-- =============================================

ALTER proc [dbo].[Files_GetByFileTypeId_Paginated]
				@typeId int
				,@pageIndex int 
				,@pageSize int
AS

/*
 Declare @typeId int = 5
		 ,@pageIndex int = 0 
         ,@pageSize int	= 4
    
 Execute dbo.Files_GetByFileTypeId_Paginated 
		@typeId
		,@pageIndex
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

	WHERE f.FileTypeId = @typeId AND f.StatusId = 1
		ORDER BY f.Id

	OFFSET @offSet Rows
	Fetch Next @pageSize Rows ONLY

END