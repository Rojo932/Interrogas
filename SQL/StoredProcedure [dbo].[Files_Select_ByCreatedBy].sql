USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Files_Select_ByCreatedBy]    Script Date: 6/25/2022 1:57:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Nima Gopali
-- Create date: 03/23/2022
-- Description: This proc gets a paginated list of Files by CreatedBy column within the dbo.Files Table using a given pageIndex and pageSize
-- Code Reviewer:Dongyoung Yang

-- MODIFIED BY: Nima Gopali
-- MODIFIED DATE: 03/24/2022
-- Code Reviewer: Justin Alcala
-- Note:

-- MODIFIED BY: Jonathan Rojo
-- MODIFIED DATE: 04/7/2022
-- Code Reviewer: Nima Gopali 
-- Note: Added Join From dbo.FileTypes and [dbo] .[StatusType]  
-- =============================================

ALTER PROC [dbo].[Files_Select_ByCreatedBy]
						@userId int
						,@pageIndex int
						,@pageSize int

as
/* ------ Test Code ------

Declare @userId int = 55
		,@pageIndex int = 0
		,@pageSize int = 2

Execute dbo.Files_Select_ByCreatedBy
					@userId
					,@pageIndex 
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

  WHERE CreatedBy = @userId

  ORDER BY Id

  OFFSET @offSet ROWS
  FETCH NEXT @pageSize ROWS ONLY

END

