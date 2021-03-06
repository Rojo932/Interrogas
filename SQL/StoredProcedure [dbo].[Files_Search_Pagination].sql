USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Files_Search_Pagination]    Script Date: 6/25/2022 1:56:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Author: Jonathan Rojo
-- Create date:4/6/2022 
-- Description: This proc is used to get paginated files by FileName and (StatusId = 1) from dbo.Files table.
-- Code Reviewer: Christian Mong

-- MODIFIED BY: 04/06/2022
-- MODIFIED DATE: 04/06/2022
-- Code Reviewer: Christian Mong
-- Note: Works as intended

-- MODIFIED BY: Jonathan Rojo
-- MODIFIED DATE: 04/07/2022
-- Code Reviewer: Nima Gopali
-- Note: Added Join From dbo.FileTypes and [dbo] .[StatusType] 


ALTER proc [dbo].[Files_Search_Pagination]
				@query nvarchar(50)
				,@pageIndex int 
				,@pageSize int
AS

/*
	DECLARE @query nvarchar(50) = 'file'
			,@pageIndex  int = 0
            ,@pageSize int = 5

	Execute dbo.Files_Search_Pagination 
			@query
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


	WHERE (f.FileName LIKE '%' + @query + '%' AND f.StatusId = 1)
		ORDER BY f.FileName

	OFFSET @offSet Rows
	Fetch Next @pageSize Rows ONLY

END