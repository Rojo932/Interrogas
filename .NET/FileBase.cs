using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class FileBase
    {
        public int Id { get; set; }
        public string Url { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Files : FileBase
    {
        public string FileName { get; set; }
        public int FileTypeId { get; set; }
        public string FileType { get; set; }
        public int CreatedBy { get; set; }
        public int StatusId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/files")]
    [ApiController]
    public class FilesApiController : BaseApiController
    {
        private IFileService _service = null;
        private AWSStorageConfig _awsStorageConfig;
        private IAuthenticationService<int> _authService;
        public FilesApiController(IOptions<AWSStorageConfig> awsStorageConfig, IFileService service, ILogger<FilesApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _awsStorageConfig = awsStorageConfig.Value;
            _authService = authService;
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Files>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("createdBy")]
        public ActionResult<ItemResponse<Paged<Files>>> CreatedByPagination( int pageIndex, int pageSize, int createdBy)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.CreatedByPagination(pageIndex, pageSize, createdBy);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("upload")]
        public async Task<ActionResult<ItemsResponse<FileBase>>> UploadFileToS3(List<IFormFile> files)
        {
            int code = 201;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                List<FileBase> output = await _service.UploadFile(files, userId);
                response = new ItemsResponse<FileBase> { Items = output };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("searchPaginate")]
        public ActionResult<ItemResponse<Paged<Files>>> SearchPagination(string fileName, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.SearchPagination(fileName, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("filetype")]
        public ActionResult<ItemResponse<Paged<Files>>> FileTypePagination(int typeId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.FileTypePagination(typeId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("deleted")]
        public ActionResult<ItemResponse<Paged<Files>>> GetDeletedPagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.GetDeletedPagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> UpdateStatusId(FileUpdate model)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                _service.UpdateStatusId(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("extract")]
        public ActionResult<ItemResponse<ElectionMetadata>> UploadPdf(IFormFile files)
        {

            int code = 200;
            BaseResponse response = null;
            try
            {
                    
                    ElectionMetadata data = _service.RetrieveData(files);
                    if(data == null)
                    {
                        code = 500;
                        response = new ErrorResponse("File could not be read");
                   
                    }
                    else
                    {
                       response = new ItemResponse<ElectionMetadata> { Item = data };
                    }
                
                             
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

    }
}

using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using GroupDocs.Conversion.Contracts;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class FileService : IFileService
    {
        IDataProvider _data = null;
        AWSStorageConfig _awsStorageConfig;
        IAuthenticationService<int> _authService;

        public FileService(IDataProvider data, IOptions<AWSStorageConfig> awsStorageConfig, IAuthenticationService<int> authService)
        {
            _data = data;
            _awsStorageConfig = awsStorageConfig.Value;
            _authService = authService;
        }

        public Paged<Files> Pagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Files_SelectAll]";
            Paged<Files> pagedList = null;
            List<Files> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@pageIndex", pageIndex);
                paramCollection.AddWithValue("@pageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Files aFile = MapFile(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex++); 

                if (list == null)
                {
                    list = new List<Files>();
                }
                list.Add(aFile);
            });
            if (list != null)
            {
                pagedList = new Paged<Files>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Files> CreatedByPagination(int pageIndex, int pageSize, int createdBy)
        {
            string procName = "[dbo].[Files_Select_ByCreatedBy]";
            Paged<Files> pagedList = null;
            List<Files> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@userId", createdBy);
                paramCollection.AddWithValue("@pageIndex", pageIndex);
                paramCollection.AddWithValue("@pageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Files aFile = MapFile(reader, ref startingIndex);

                totalCount = reader.GetSafeInt32(startingIndex++);

                if (list == null)
                {
                    list = new List<Files>();
                }
                list.Add(aFile);
            });
            if (list != null)
            {
                pagedList = new Paged<Files>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Files> SearchPagination(string fileName, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Files_Search_Pagination]";
            Paged<Files> pagedList = null;
            List<Files> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@query", fileName);
                paramCollection.AddWithValue("@pageIndex", pageIndex);
                paramCollection.AddWithValue("@pageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Files aEvent = MapFile(reader, ref startingIndex);

                totalCount = reader.GetSafeInt32(startingIndex++);

                if (list == null)
                {
                    list = new List<Files>();
                }
                list.Add(aEvent);
            });
            if (list != null)
            {
                pagedList = new Paged<Files>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Files> FileTypePagination(int typeId, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Files_GetByFileTypeId_Paginated]";
            Paged<Files> pagedList = null;
            List<Files> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@typeId", typeId);
                paramCollection.AddWithValue("@pageIndex", pageIndex);
                paramCollection.AddWithValue("@pageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Files aEvent = MapFile(reader, ref startingIndex);

                totalCount = reader.GetSafeInt32(startingIndex++);

                if (list == null)
                {
                    list = new List<Files>();
                }
                list.Add(aEvent);
            });
            if (list != null)
            {
                pagedList = new Paged<Files>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Files> GetDeletedPagination(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Files_SelectDeleted]";
            Paged<Files> pagedList = null;
            List<Files> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Files aFile = MapFile(reader, ref startingIndex);
                totalCount = reader.GetSafeInt32(startingIndex++); 

                if (list == null)
                {
                    list = new List<Files>();
                }
                list.Add(aFile);
            });
            if (list != null)
            {
                pagedList = new Paged<Files>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void UpdateStatusId(FileUpdate model)
        {
            string procName = "[dbo].[Files_Update_StatusId]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@id", model.Id);
                    col.AddWithValue("@statusId", model.StatusId);
                },
                returnParameters: null);
        }

        private static Files MapFile(IDataReader reader, ref int startingIndex)
        {
            Files aFile = new Files();

            aFile.Id = reader.GetSafeInt32(startingIndex++);
            aFile.FileName = reader.GetSafeString(startingIndex++);
            aFile.Url = reader.GetSafeString(startingIndex++);
            aFile.FileTypeId = reader.GetSafeInt32(startingIndex++);
            aFile.FileType = reader.GetSafeString(startingIndex++);
            aFile.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aFile.StatusId = reader.GetSafeInt32(startingIndex++);
            aFile.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aFile.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aFile;
        }
        public async Task<List<FileBase>> UploadFile(List<IFormFile> files, int userId)
        {
            List<FileBase> outputList = null;
            foreach (var file in files)
            {
                FileBase fileBase = null;
                var regionIdentifier = RegionEndpoint.GetBySystemName(_awsStorageConfig.BucketRegion);
                var keyName = Guid.NewGuid().ToString() + "_" + file.FileName;
                if (files.Count > 0)
                {
                    using (var client = new AmazonS3Client(_awsStorageConfig.AccessKey, _awsStorageConfig.Secret, regionIdentifier))
                    {
                        using (var newMemoryStream = new MemoryStream())
                        {
                            file.CopyTo(newMemoryStream);

                            var uploadRequest = new TransferUtilityUploadRequest
                            {
                                InputStream = newMemoryStream,
                                Key = keyName,
                                BucketName = _awsStorageConfig.BucketName
                            };

                            var fileTransferUtility = new TransferUtility(client);
                            await fileTransferUtility.UploadAsync(uploadRequest);

                            string itemUrl = _awsStorageConfig.Domain + keyName;
                            int id = Add(file, itemUrl, userId);

                            if (id > 0)
                            {
                                fileBase = new FileBase();
                                fileBase.Id = id;
                                fileBase.Url = itemUrl;
                            }

                            if (outputList == null)
                            {
                                outputList = new List<FileBase>();
                            }
                            outputList.Add(fileBase);
                        }
                    }
                }
            }
            return outputList;
        }

        public int Add(IFormFile file, string url, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Files_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@FileName", file.FileName);
                col.AddWithValue("@Url", url);
                col.AddWithValue("@FileTypeId", GenerateFileTypeId(file));
                col.AddWithValue("@CurrentUserId", userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            },
          returnParameters: delegate (SqlParameterCollection returnCollection)
          {
              object oId = returnCollection["@Id"].Value;
              int.TryParse(oId.ToString(), out id);
          });
            return id;
        }


        public ElectionMetadata RetrieveData(IFormFile file)
        {

            ElectionMetadata data = null;
            string convertedData = ConvertFile(file);

            data = ReadData(convertedData); 

            return data;

        }

        private string ConvertFile(IFormFile aFile)
        {
            string convertedData = null;
            using (var ms = new MemoryStream())
            {
                aFile.CopyTo(ms);

                var converter = new GroupDocs.Conversion.Converter(() => ms);
                var convertOptions = converter.GetPossibleConversions()["csv"].ConvertOptions;
                using (var nms = new MemoryStream())
                {
                    var sds = new SaveDocumentStream(() => nms);
                    converter.Convert(sds, convertOptions);

                    var fileBytes = nms.ToArray();

                    convertedData = Encoding.Default.GetString(fileBytes);

                    nms.Dispose();
                }
                ms.Dispose();
            }

            return convertedData;
        }
        private ElectionMetadata ReadData(string fileData)
        {

            /*  Values to be extracted from the pdf file  */
            string objective = "1-Objetivo";
            string publicationDate = "Fecha de publicación";
            string cost = "Recursos aplicados ($)";
            string pollsterName = "Quién realizó";

            ElectionMetadata metadata = null;

            if (fileData.Contains(objective) || fileData.Contains(publicationDate) || fileData.Contains(cost) || fileData.Contains(pollsterName))
            {
                metadata = new ElectionMetadata();
                using (var reader = new StringReader(fileData))
                {
                    string line = reader.ReadLine();
                    while (line != null)
                    {

                        if (line.Contains(objective))
                        {

                            metadata.Objective = retrieveMultiLineData(reader, ref line, objective);

                        }
                        else if (line.Contains(publicationDate))
                        {
                            metadata.PublicationDate = retrieveMultiLineData(reader, ref line, publicationDate);
                        }
                        else if (line.Contains(cost))
                        {
                            metadata.Cost = retrieveMultiLineData(reader, ref line, cost);
                        }
                        else if (line.Contains(pollsterName))
                        {
                            metadata.PollsterName = retrieveMultiLineData(reader, ref line, pollsterName);
                        }

                        line = reader.ReadLine();

                    }
                    reader.Close();
                }
            }
            return metadata;
        }

        private string retrieveMultiLineData(StringReader reader, ref string line, string keyValues)
        {
            string extractedData = line.Remove(0, keyValues.Length + 1).Trim(',').Trim('"');
            string nextLine = null;
            while (!line.EndsWith(','))
            {
                line = reader.ReadLine();
                nextLine = line.Remove(0, keyValues.Length + 1).Trim(',').Trim('"');
                extractedData = String.Concat(extractedData, nextLine);
            }

            return extractedData;
        }
        public int GetFileTypeId(string name)
        {
            string procName = "[dbo].[FileTypes_SelectByName]";

            int fileTypeId = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Input", name);
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                fileTypeId = MapFileTypeData(reader, ref startingIndex);

            });
            return fileTypeId;
        }

        public int GenerateFileTypeId(IFormFile file)
        {
            string fileType = System.IO.Path.GetExtension(file.FileName).Substring(1);

            int id = GetFileTypeId(fileType);
            return id;
        }

        private static int MapFileTypeData(IDataReader reader, ref int startingIndex)
        {
            int Id = reader.GetSafeInt32(startingIndex++);
            return Id;
        }



    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class FileUpdate
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
    }
}

using Microsoft.AspNetCore.Http;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IFileService
    {
        Paged<Files> Pagination(int pageIndex, int pageSize);
        Paged<Files> SearchPagination(string fileName,int pageIndex, int pageSize);
        Paged<Files> CreatedByPagination(int pageIndex, int pageSize, int createdBy);
        Paged<Files> FileTypePagination(int typeId, int pageIndex, int pageSize);
        Task<List<FileBase>> UploadFile(List<IFormFile> files, int userId);
        void UpdateStatusId(FileUpdate model);
        Paged<Files> GetDeletedPagination(int pageIndex, int pageSize);
        ElectionMetadata RetrieveData(IFormFile pdfFile);

    }
}
